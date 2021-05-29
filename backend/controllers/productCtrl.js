const Products = require('../models/product');

exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      content,
      images,
      category,
      location,
      owner_id,
    } = req.body;
    if (!images) return res.status(400).json({msg: 'No image upload'});

    const newProduct = new Products({
      title,
      price,
      description,
      content,
      images,
      category,
      location,
      owner_id,
    });

    await newProduct.save();
    res.json({msg: 'Successfully added a place'});
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};

exports.updateProduct = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a property to update',
    });
  }

  Products.findOne({_id: req.params.id}, (err, products) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Product not found!',
      });
    }
    (products.title = body.title),
      (products.price = body.price),
      (products.description = body.description),
      (products.content = body.content),
      (products.images = body.pimg),
      (products.location = body.location),
      (products.owner_id = body.owner_id),
      (products.checked = body.sold),
      (products.sold = body.sold

        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: product._id,
            message: 'Property updated!',
          });
        })
        .catch(error => {
          return res.status(404).json({
            error,
            message: 'Property not updated!',
          });
        }));
  });
};

exports.deleteProducts = async (req, res) => {
  await Products.findOneAndDelete({_id: req.params.id}, (err, products) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!products) {
      return res
        .status(404)
        .json({success: false, error: `Property not found`});
    }

    return res.status(200).json({success: true, data: products});
  }).catch(err => console.log(err));
};

exports.getProductsById = async (req, res) => {
  await Products.findOne({_id: req.params.id}, (err, products) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!products) {
      return res
        .status(404)
        .json({success: false, error: `Products not found`});
    }
    return res.status(200).json({success: true, data: products});
  }).catch(err => console.log(err));
};

exports.getProductsByOId = async (req, res) => {
  await Products.find({owner_id: req.params.id}, (err, products) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!products) {
      return res
        .status(404)
        .json({success: false, error: `Products not found`});
    }
    return res.status(200).json({success: true, data: products});
  }).catch(err => console.log(err));
};

exports.getProducts = async (req, res) => {
  await Products.find({}, (err, products) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!products.length) {
      return res
        .status(404)
        .json({success: false, error: `Properties not found`});
    }
    return res.status(200).json({success: true, data: products});
  }).catch(err => console.log(err));
};

exports.getSinglerooms = async (req, res) => {
  await Products.find({category: {$eq: 'Single Room'}}, (err, products) => {
    if (err) {
      return res.status(400).json({error: err});
    }
    if (!products.length) {
      return res.status(404).json({error: `Properties not found`});
    }
    return res.status(200).json({products});
  }).catch(err => console.log(err));
};

exports.getSharedrooms = async (req, res) => {
  await Products.find({category: {$eq: 'Shared Room'}}, (err, products) => {
    if (err) {
      return res.status(400).json({error: err});
    }
    if (!products.length) {
      return res
        .status(404)
        .json({success: false, error: `Properties not found`});
    }
    return res.status(200).json({data: products});
  }).catch(err => console.log(err));
};

exports.getHouses = async (req, res) => {
  await Products.find({category: {$eq: 'House'}}, (err, products) => {
    if (err) {
      return res.status(400).json({error: err});
    }
    if (!products.length) {
      return res
        .status(404)
        .json({success: false, error: `Properties not found`});
    }
    return res.status(200).json({data: products});
  }).catch(err => console.log(err));
};

exports.getAnnexs = async (req, res) => {
  await Products.find(
    {category: {$nin: ['Shared Room', 'Single Room', 'House']}},
    (err, products) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      if (!products.length) {
        return res
          .status(404)
          .json({success: false, error: `Properties not found`});
      }
      return res.status(200).json({data: products});
    },
  ).catch(err => console.log(err));
};

exports.getSinRoomCount = async (req, res) => {
  await Products.count(
    {category: {$eq: 'Single Room'}},
    function (err, sinrcount) {
      if (err) {
        return res.status(400).json({error: err});
      } else {
        return res.status(200).json({sincount: sinrcount});
      }
    },
  );
};

exports.getShrRoomCount = async (req, res) => {
  await Products.count({category: 'Shared Room'}, function (err, shrrcount) {
    if (err) {
      return res.status(400).json({error: err});
    } else {
      return res.status(200).json({shrrcount: shrrcount});
    }
  });
};

exports.getHouseCount = async (req, res) => {
  await Products.count({category: 'Home'}, function (err, housecount) {
    if (err) {
      return res.status(400).json({error: err});
    } else {
      return res.status(200).json({housecount: housecount});
    }
  });
};

exports.getAnxCount = async (req, res) => {
  await Products.count(
    {category: {$nin: ['Shared Room', 'Single Room', 'House']}},
    function (err, annexcount) {
      if (err) {
        return res.status(400).json({error: err});
      } else {
        return res.status(200).json({annexcount: annexcount});
      }
    },
  );
};
