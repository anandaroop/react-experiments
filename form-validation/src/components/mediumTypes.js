const mediumTypes = [
  {
    name: 'Painting',
    manufacturer: false,
    unique: false,
    publisher: false,
    duration: false
  },
  {
    name: 'Sculpture',
    manufacturer: true,
    unique: true,
    publisher: false,
    duration: false
  },
  {
    name: 'Photography',
    manufacturer: false,
    unique: true,
    publisher: false,
    duration: false
  },
  {
    name: 'Print',
    manufacturer: false,
    unique: true,
    publisher: true,
    duration: false
  },
  {
    name: 'Drawing, Collage or other Work on Paper',
    manufacturer: false,
    unique: false,
    publisher: false,
    duration: false
  },
  {
    name: 'Mixed Media',
    manufacturer: false,
    unique: false,
    publisher: false,
    duration: false
  },
  {
    name: 'Performance Art',
    manufacturer: false,
    unique: true,
    publisher: false,
    duration: true
  },
  {
    name: 'Installation',
    manufacturer: false,
    unique: false,
    publisher: false,
    duration: false
  },
  {
    name: 'Video/Film/Animation',
    manufacturer: false,
    unique: true,
    publisher: false,
    duration: true
  },
  {
    name: 'Architecture',
    manufacturer: false,
    unique: false,
    publisher: false,
    duration: false
  },
  {
    name: 'Fashion Design and Wearable Art',
    manufacturer: true,
    unique: true,
    publisher: false,
    duration: false
  },
  {
    name: 'Jewelry',
    manufacturer: true,
    unique: true,
    publisher: false,
    duration: false
  },
  {
    name: 'Design/Decorative Art',
    manufacturer: true,
    unique: true,
    publisher: false,
    duration: false
  },
  {
    name: 'Textile Arts',
    manufacturer: true,
    unique: true,
    publisher: false,
    duration: false
  },
  {
    name: 'Other',
    manufacturer: false,
    unique: false,
    publisher: true,
    duration: false
  }
]

const mediumTypeNames = mediumTypes.map(t => t.name)

export default mediumTypeNames

export const allowsManufacturer = mediumTypeName =>
  mediumTypes.filter(t => t.manufacturer).map(t => t.name).indexOf(mediumTypeName) >= 0

export const allowsUnique = mediumTypeName =>
  mediumTypes.filter(t => t.unique).map(t => t.name).indexOf(mediumTypeName) >= 0

export const allowsPublisher = mediumTypeName =>
  mediumTypes.filter(t => t.publisher).map(t => t.name).indexOf(mediumTypeName) >= 0

export const allowsDuration = mediumTypeName =>
  mediumTypes.filter(t => t.duration).map(t => t.name).indexOf(mediumTypeName) >= 0
