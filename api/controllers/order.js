const Orders = require('../models/order');
const errorHandler = require('../utils/errHandler');


module.exports.getAll = async function (req, res) {
  const query = {
      user: req.user.id
  };

  //filter data start
  if (req.query.start) {
      query.date = {
          // $gte- metod mongoose kotor@ proveryaet bolshe ili rovno v BD
          $gte: req.query.start
      };
  }

  if (req.query.end) {
      if (!query.date) {
          query.date = {}
      }
      // $lte - menshe ili rovno
      query.date['$lte'] = req.query.end;
  }

  if (req.query.order) {
      query.order = +req.query.order;
  }

  try {
  // skip() ispolzuetsa dlya nastroiki opcii beskonechnogo skrola vnutri peredautsa kollichestvo elementov otobrojenia
  //localhost:5000/api/order?offset=2&limit=5
      const orders = await Order.find(query)
              .sort({ date: -1 })
              .skip(+req.query.offset)
              .limit(+req.query.limit);
      res.status(200).json(orders);
  } catch(err) {
      errorHandler(res, err);
  }
}


module.exports.create = async function (req, res) {
  try {
    const lastOrder = await Orders.findOne({ user: req.user.id }).sort({ date: -1 });

    const maxOrder = lastOrder? lastOrder.order: 0;

    const order = await new Orders({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1,
    }).save();

    res.status(201).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
}

