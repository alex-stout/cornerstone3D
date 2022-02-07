import dcmjs from 'dcmjs';
import { Utilities as csUtils } from '@precisionmetrics/cornerstone-render'
const metadataHeadersPerImageId = {};
const INSTANCE = 'instance';

function addInstance(imageId, dicomJSONDatasetOrP10ArrayBuffer) {
  let dicomJSONDataset;

  // If Arraybuffer, parse to DICOMJSON before naturalizing.
  if (dicomJSONDatasetOrP10ArrayBuffer instanceof ArrayBuffer) {
    const dicomData = DicomMessage.readFile(dicomJSONDatasetOrP10ArrayBuffer);

    dicomJSONDataset = dicomData.dict;
  } else {
    dicomJSONDataset = dicomJSONDatasetOrP10ArrayBuffer;
  }

  // Check if dataset is already naturalized.

  let naturalizedDataset;

  if (dicomJSONDataset['SeriesInstanceUID'] === undefined) {
    naturalizedDataset = dcmjs.data.DicomMetaDictionary.naturalizeDataset(
      dicomJSONDataset
    );
  } else {
    naturalizedDataset = dicomJSONDataset;
  }

  const imageURI = csUtils.imageIdToURI(imageId)
  metadataHeadersPerImageId[imageURI] = naturalizedDataset;
}

function get(query, imageId) {
  const imageURI = csUtils.imageIdToURI(imageId)

  if (query === INSTANCE) {
    return metadataHeadersPerImageId[imageURI];
  }
}

export default { addInstance, get };