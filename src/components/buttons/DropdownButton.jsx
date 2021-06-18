import React from 'react';
import { Pressable, View } from 'react-native';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Icon, ListItem } from 'react-native-elements';

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
  leftBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    marginLeft: '14@s',
  },
});

const DropdownButton = ({ icon, label, items, onSelect }) => {
  return (
    <ListItem.Accordion
      containerStyle={styles.container}
      isExpanded={true}
      icon={{ type: 'font-awesome-5', name: 'chevron-down', size: scale(18), color: green }}
      content={
        <>
          <Icon type="font-awesome-5" name={icon} size={scale(23)} color={blue} solid />
          <ListItem.Content>
            <FormText label={label} containerStyle={styles.label} />
          </ListItem.Content>
        </>
      }>
      {items &&
        items.map((item, index) => (
          <ListItem key={index} onPress={() => onSelect(item)} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{items.email}</ListItem.Title>
              <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
    </ListItem.Accordion>
    // <Pressable style={styles.container} onPress={() => onPress()}>
    //   <View style={styles.leftBox}>
    //     <Icon type="font-awesome-5" name={icon} size={scale(23)} color={blue} solid />
    //     <FormText label={label} containerStyle={styles.label} />
    //   </View>
    //   <Icon type="font-awesome-5" name="chevron-down" size={scale(20)} color={green} solid />
    // </Pressable>
  );
};

export default DropdownButton;
