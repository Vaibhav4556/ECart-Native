import React from 'react';
import {Avatar, IconButton, Text} from 'react-native-paper';
import {View, TouchableOpacity} from 'react-native';

import usePagination from './UsePagination';

const RenderPage = ({totalResults, currentPage, setCurrentPage}: any) => {
  const totalCount = totalResults;

  const pageSize = 10;

  const lastPage = Math.ceil(totalCount / pageSize);
  const pagination: any = usePagination({totalCount, currentPage, pageSize});

  return (
    <View style={{justifyContent: 'flex-end', marginTop: 10}}>
      <View style={{flexDirection: 'row',alignItems:"center"}}>
        <IconButton
          icon="chevron-left"
          testID="backward"
          onPress={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pagination?.map((page: any, index: any) => {
          if (page === 'DOTS') {
            return (
              <View key={index}>
                <Text style={{color: 'black', fontSize: 20, fontWeight: '800'}}>
                  ...
                </Text>
              </View>
            );
          }
          return (
            <TouchableOpacity
              onPress={() => setCurrentPage(page)}
              key={index}
              style={{margin: 3}}>
              <Text
                style={{
                  backgroundColor: currentPage === page ? '#FFBA86' : 'lightgrey',
                  padding: 5,
                  width: 35,
                  fontSize: 14,
                  textAlign: 'center',
                }}
                testID={`page${page}`}>
                {page}
              </Text>
            </TouchableOpacity>
          );
        })}
        <IconButton
          icon="chevron-right"
         
          testID="forward"
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === lastPage}
        />
      </View>
    </View>
  );
};

export default RenderPage;
