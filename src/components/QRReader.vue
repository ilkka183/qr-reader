<template>
  <div>
    <h1>QR Reader (Vue)</h1>
    <button :disabled="false" @click="startQR">Start QR</button>
    <button :disabled="false" @click="startBarcode">Start Barcode</button>
    <button :disabled="false" @click="stop">Stop</button>
    <div id="scannedText" class="scanned-text">{{scannedText}}</div>
    <div id="scanner"></div>
  </div>
</template>

<script>
import CodeReader from '@/lib/code-reader';

export default {
  data() {
    return {
      reader: new CodeReader('scanner'),
      scannedText: 'ready',
    }
  },
  created() {
    if (!document.getElementById('QRScanner'))
    {
      const script = document.createElement('script')
      script.setAttribute('id', 'QRScanner');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'https://jbialobr.github.io/JsQRScanner/jsPretty/jsqrscanner.nocache.js');

      document.head.appendChild(script);
      window.console.log(script);

//      var scanner = new JsQRScanner();
//      window.console.log(scanner);
    }
  },
  mounted() {
    this.reader.onCodeScanned = this.codeScanned;
    this.reader.onErrorRaised = this.errorRaised;
  },
  methods: {
    startQR() {
      this.scannedText = 'scanning QR code...';
      this.reader.scannerType = 'qr';
      this.reader.startScanning();
    },
    startBarcode() {
      this.scannedText = 'scanning barcode...';
      this.reader.scannerType = 'barcode';
      this.reader.startScanning();
    },
    stop() {
      this.scannedText = 'ready';
      this.reader.stopScanning();
    },
    codeScanned(text) {
      this.scannedText = text;
      this.reader.stopScanning();
    },
    errorRaised(text) {
      this.scannedText = text;
    }
  }
}
</script>

<style scoped>
button {
  padding: 10px;
  margin-right: 5px;
  border-radius: 5px;
}

.scanned-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: 30px;
}
</style>
