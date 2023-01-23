import { Text, View, Pressable } from 'react-native';
import React, { FunctionComponent } from 'react';
import { makeStyles, ThemeConsumer } from '@rneui/themed';

import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded';

import LicensePlaceHolderIcon from '../../../assets/icons/license-placeholder.svg';
import UploadIcon from '../../../assets/icons/upload.svg';

interface IProps {}
type Props = IProps;

const useStyles = makeStyles((theme, props: Props) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  contentWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    marginVertical: 20,
    height: 214,
    width: '100%',
    borderColor: theme.colors.stroke,
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadViewContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  uploadIcon: {
    width: 21,
    height: 21,
    color: '#0B449D',
    margin: 10,
  },

  uploadText: {
    color: theme.colors.labelColor,
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const DriverLicenseScreen: FunctionComponent = (props: Props) => {
  const styles = useStyles(props);

  const handleImageUpload = () => {
    //TODO: open image picker and upload image
  };

  const handleSaveChanges = () => {
    // TODO: save changes to firebase
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.imageContainer}>
              <LicensePlaceHolderIcon width={133} height={111} stroke={theme.colors.stroke} />
            </View>

            <Pressable onPress={handleImageUpload} style={styles.uploadViewContainer}>
              <UploadIcon style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Upload Driver License</Text>
            </Pressable>
          </View>

          <View style={styles.bottomSection}>
            <Rounded onPress={handleSaveChanges} fullWidth>
              Save Changes
            </Rounded>
          </View>
        </View>
      )}
    </ThemeConsumer>
  );
};
