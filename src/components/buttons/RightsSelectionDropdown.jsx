import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { BottomSheet, Icon, ListItem } from 'react-native-elements';
import I18n from 'i18n-js';

import FormText from '../labels/FormText';

import { greyShade, blue, green, pink, grey } from '../../global/colors';

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

const RightsSelectionDropdown = ({ disabled, onSelect }) => {
  const { t } = I18n;

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const openBottomSheetIfNotDisabled = () => {
    if (disabled) return null;
    else return setIsBottomSheetVisible(true);
  };

  const selectRightsAndCloseList = (selection) => {
    setIsBottomSheetVisible(false);
    onSelect(selection);
  };

  return (
    <>
      <Pressable style={styles.container} onPress={() => openBottomSheetIfNotDisabled()}>
        <View style={styles.leftBox}>
          <Icon
            type="font-awesome-5"
            name="user-shield"
            size={scale(23)}
            color={disabled ? grey : blue}
            solid
          />
          <FormText label={t('userRights')} containerStyle={styles.label} />
        </View>
        <Icon
          type="font-awesome-5"
          name="chevron-down"
          size={scale(20)}
          color={disabled ? grey : green}
          solid
        />
      </Pressable>

      <BottomSheet isVisible={isBottomSheetVisible}>
        <ListItem
          containerStyle={styles.bottomListItem}
          onPress={() => selectRightsAndCloseList('admin')}
          bottomDivider>
          <Icon type="font-awesome-5" name="user-shield" size={scale(20)} color={pink} solid />
          <ListItem.Content>
            <ListItem.Title>{t('admin')}</ListItem.Title>
            <ListItem.Subtitle>{t('adminAppRights')}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color={green} />
        </ListItem>

        <ListItem
          containerStyle={styles.bottomListItem}
          onPress={() => selectRightsAndCloseList('poll')}
          bottomDivider>
          <Icon type="font-awesome-5" name="user-check" size={scale(20)} color={green} solid />
          <ListItem.Content>
            <ListItem.Title>{t('poller')}</ListItem.Title>
            <ListItem.Subtitle>{t('pollerAppRights')}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color={green} />
        </ListItem>

        <ListItem
          containerStyle={styles.bottomListItem}
          onPress={() => selectRightsAndCloseList('user')}
          bottomDivider>
          <Icon type="font-awesome-5" name="user" size={scale(20)} color={blue} solid />
          <ListItem.Content>
            <ListItem.Title>{t('user')}</ListItem.Title>
            <ListItem.Subtitle>{t('userAppRights')}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color={green} />
        </ListItem>
      </BottomSheet>
    </>
  );
};

export default RightsSelectionDropdown;
