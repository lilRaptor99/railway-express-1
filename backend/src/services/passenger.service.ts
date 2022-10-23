import { ComplaintsAndSuggestions } from '@prisma/client';
import prisma from '../../prisma/prisma-client';
import sendMail, { EmailTo } from '../utils/send-mail';
import { User } from '../models/user.model';

export async function updateProfile(userData: User) {
  await prisma.user.update({
    where: {
      userId: userData.userId,
    },
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      nic: userData.nic,
      phoneNumber: userData.phoneNumber,
    },
  });

  return true;
}

export async function addComplaint(
  complaint: ComplaintsAndSuggestions,
  user: User
) {
  const updatedComplaint = { ...complaint };
  updatedComplaint.userId = user.userId;

  const emailTo = user as EmailTo;

  const complaintRes = await prisma.complaintsAndSuggestions.create({
    data: updatedComplaint,
  });
  if (complaint.isComplaint) {
    sendMail(
      emailTo,
      'Sorry for the Inconvenience Caused',
      /* HTML */
      `<p>
        We have received your complaint, and we are in the process of reviewing
        it. <br />
        We will respond to you promptly.
      </p>`
    );
  } else {
    sendMail(
      emailTo,
      'Thank you for the suggestion',
      /* HTML */
      `<p>
        This is to confirm you that we have received your suggestion regarding
        Railway Express.
      </p>`
    );
  }
  return complaintRes;
}

export async function getMyTickets(userId: string) {
  return prisma.ticket.findMany({
    where: { userId },
    include: {
      destinationStation: true,
      startStation: true,
      Reservation: true,
    },
  });
}

export function testFunction() {}
