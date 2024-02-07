const { MudletMapReader } = require("mudlet-map-binary-reader");

const inputFile = "map.dat"
const outputDirectory = "page/data"

let mapModel = MudletMapReader.read(inputFile);

let { mudletMap, colors } = MudletMapReader.export(mapModel, outputDirectory);
