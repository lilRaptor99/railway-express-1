-- CreateTable
CREATE TABLE "ComplaintsAndSuggestions" (
    "complaintId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isComplaint" BOOLEAN NOT NULL,

    CONSTRAINT "ComplaintsAndSuggestions_pkey" PRIMARY KEY ("complaintId")
);

-- AddForeignKey
ALTER TABLE "ComplaintsAndSuggestions" ADD CONSTRAINT "ComplaintsAndSuggestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
