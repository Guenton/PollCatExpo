import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { BottomSheet, Icon, ListItem } from 'react-native-elements';
import I18n from 'i18n-js';

import FormText from '../labels/FormText';

import { greyShade, blue, green } from '../../global/colors';

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    height: '60@s',
    width: '300@s',
    padding: '14@s',
    borderRadius: '10@s',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: greyShade,
  },
  bottomListItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    marginLeft: '14@s',
  },
  itemLabel: {
    marginLeft: '5@s',
  },
});

const AnswerSelectionDropdown = ({ answers, selectedAnswer, onSelect }) => {
  const { t } = I18n;

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const selectLabel = () => {
    if (selectedAnswer) return selectedAnswer;
    else if (answers.length === 0) return t('noStoredPolls');
    else return t('selectPoll');
  };

  const selectItemAndCloseList = (item) => {
    onSelect(item);
    setIsBottomSheetVisible(false);
  };

  const openBottomSheet = () => {
    if (answers.length > 0) setIsBottomSheetVisible(true);
  };

  return (
    <>
      <Pressable style={styles.container} onPress={() => openBottomSheet()}>
        <View style={styles.leftBox}>
          <Icon type="font-awesome-5" name="bell" size={scale(23)} color={blue} solid />
          <FormText label={selectLabel()} containerStyle={styles.label} />
        </View>
        <Icon type="font-awesome-5" name="chevron-down" size={scale(20)} color={green} solid />
      </Pressable>

      <BottomSheet isVisible={isBottomSheetVisible}>
        {answers.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={styles.bottomListItem}
            onPress={() => selectItemAndCloseList(item)}
            bottomDivider>
            <Icon type="font-awesome-5" name="bell" size={scale(20)} color={blue} solid />
            <ListItem.Content>
              <ListItem.Title>{item}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color={green} />
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

export default AnswerSelectionDropdown;
