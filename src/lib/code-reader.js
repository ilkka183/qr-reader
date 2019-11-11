import QRScanner from './qr-scanner';
import BarcodeScanner from './barcode-scanner';


export default class CodeReader {
  constructor(elementId) {
    this.elementId = elementId;
    this._scannerType = 'barcode';
    this.barcodeScanner = new BarcodeScanner(this);
    this.qrScanner = new QRScanner(this);
    this._onCodeScanned = null;
    this._onErrorRaised = null;
    this._onStateChanged = null;
  }

  get activeScanner() {
    switch (this._scannerType) {
      case 'qr': return this.qrScanner;
      case 'barcode': return this.barcodeScanner;
    }

    return null;
  }

  get scannerType() {
    return this._scannerType;
  }

  set scannerType(value) {
    if (value == 'qr')
      this._scannerType = 'qr';
    else if (value == 'barcode')
      this._scannerType = 'barcode';
  }

  get isActive() {
    return this.activeScanner.isActive;
  }

  startScanning() {
    this.activeScanner.start();
  }

  stopScanning() {
    this.activeScanner.stop();
  }

  set onCodeScanned(value) {
    this._onCodeScanned = value;
  }

  set onErrorRaised(value) {
    this._onErrorRaised = value;
  }

  set onStateChanged(value) {
    this._onStateChanged = value;
  }

  codeScanned(scannedText) {
    window.console.log('Code scanned: ' + scannedText);

    if (this._onCodeScanned)
      this._onCodeScanned(scannedText);
  }

  errorRaised(error) {
    window.console.log('Error raised: ' + error);

    if (this._onErrorRaised)
      this._onErrorRaised(error);
  }

  stateChanged() {
    window.console.log('Active = ' + this.isActive);

    if (this._onStateChanged)
      this._onStateChanged();
  }
}
