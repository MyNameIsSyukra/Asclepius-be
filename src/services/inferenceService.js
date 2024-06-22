const tf = require("@tensorflow/tfjs-node");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node.decodeImage(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    let label, suggestion;
    let isBadRequest = false;
    if (confidenceScore > 99) {
      label = "Cancer";
      suggestion = "Please consult with your doctor immediately.";
    } else if (confidenceScore < 1) {
      label = "Not Cancer";
      suggestion = "healthy.";
    } else {
      label = "Unknown";
      suggestion = "Please use the correct picture.";
      isBadRequest = true;
    }

    return { confidenceScore, label, suggestion, isBadRequest };
  } catch (error) {
    throw new Error("Terjadi kesalahan dalam melakukan prediksi");
  }
}

module.exports = predictClassification;
