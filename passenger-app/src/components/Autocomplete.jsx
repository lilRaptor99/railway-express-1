import AutocompleteInput from 'react-native-autocomplete-input';
import React, { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { TouchableRipple } from 'react-native-paper';

export default function Autocomplete({
  itemsArray,
  placeholder,
  onSelectItem,
  currentItem = null,
}) {
  const [query, setQuery] = useState('');
  const queriedStations = itemsArray.filter((item) => {
    return item.toLowerCase().includes(query.toLowerCase());
  });
  const isLoading = itemsArray?.length == 0;
  const placeholderText = isLoading ? 'Loading data...' : placeholder;

  if (queriedStations[0] === query) {
    onSelectItem(query);
  }

  return (
    <View style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <AutocompleteInput
          inputContainerStyle={styles.inputContainer}
          listContainerStyle={styles.listContainer}
          editable={!isLoading}
          autoCorrect={false}
          data={
            queriedStations?.length === 1 && queriedStations[0] === query
              ? [] // Close suggestion list in case title matches query
              : query.length === 0
              ? []
              : queriedStations.slice(0, 3)
          }
          value={query}
          onChangeText={setQuery}
          placeholder={placeholderText}
          flatListProps={{
            keyboardShouldPersistTaps: 'always',
            keyExtractor: (station) => station,
            renderItem: ({ item }) => (
              <TouchableRipple
                onPress={() => setQuery(item)}
                rippleColor="rgba(0, 0, 0, 0.1)"
                borderless
              >
                <View className="py-2 px-5">
                  <Text>{item}</Text>
                </View>
              </TouchableRipple>
            ),
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#F4F4F6',
    width: '100%',
    paddingTop: 50,
    ...Platform.select({
      web: {
        marginTop: 0,
        marginBottom: 20,
      },
      default: {
        marginTop: 15,
        marginBottom: 10,
      },
    }),
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
  inputContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    padding: 10,
    zIndex: 80,
    backgroundColor: 'white',
  },
  listContainer: {
    position: 'absolute',
    width: '100%',
    bottom: '105%',
    borderRadius: 12,
    elevation: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});
