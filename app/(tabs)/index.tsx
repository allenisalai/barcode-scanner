import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Image, Platform, Button, StyleSheet, Text, TouchableOpacity, View , Alert} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import BarcodeBorder from '@/components/BarcodeBorder';

import { debounce } from 'lodash';

const ACCEPTABLE_PRODUCTS: Array<string> = ["SQWQFTRbSs"]


export default function HomeScreen() {



  let timeout

  const [facing, setFacing] = useState('back');
  const [scannedBarcodeData, setScannedBarcodeData] = useState('');
  const [barcodeBorderProps, setBarcodeBorderProps] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const createTwoButtonAlert = (isAcceptableProduct: Bool) =>
        Alert.alert(
            'Results',
            isAcceptableProduct ? 'This product is covered' : 'This product is not covered',
            [
                {text: 'OK' },
            ]
        );

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function scanBarcode(results) {

      if (this.timeout) {
          clearTimeout(this.timeout)
      }

     setBarcodeBorderProps({
          x: results.bounds.origin.x,
          y: results.bounds.origin.y,
          width: results.bounds.size.width,
          height: results.bounds.size.height
      })
     setScannedBarcodeData(results.data)

     this.timeout = setTimeout(
         () => {
             setScannedBarcodeData("")
             setBarcodeBorderProps(false)
         },
         100
     )
  }

  function checkItemBarcode() {
        if (scannedBarcodeData === "") {
          return
        }

        createTwoButtonAlert(ACCEPTABLE_PRODUCTS.includes(scannedBarcodeData))
  }


  return (
      <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}
      autofocus="on"
      barcodeScannerSettings={{
        barcodeTypes: ["aztec", "ean13" , "ean8" , "qr" , "pdf417" , "upc_e" , "datamatrix" , "code39" , "code93" , "itf14" , "codabar" , "code128" , "upc_a"],
      }}
      onBarcodeScanned={scanBarcode}
      >
        { barcodeBorderProps ? <BarcodeBorder {...barcodeBorderProps}></BarcodeBorder> : null }

        { scannedBarcodeData !== ""
        ? <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.checkBarcodeButton} onPress={checkItemBarcode}>
                <Text style={styles.text}>Check Item</Text>
              </TouchableOpacity>
          </View>
        : null
        }
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  checkBarcodeButton: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'red',
      color: 'white',
  }

});
