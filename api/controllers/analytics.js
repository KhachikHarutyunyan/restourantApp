const Order = require('../models/order');
const errorHandler = require('../utils/errHandler');
const moment = require('moment');

module.exports.overview = async function (req, res) {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort({ date: 1 });

    const ordersMap = getOrdersMap(allOrders);
    
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

    // yesterday orders
    const yesterdayOrdersNumber = yesterdayOrders.length;
    
    // order number
    const totalOrdersNumber = allOrders.length;

    // all days count
    const daysNumber = Object.keys(ordersMap).length;
    //orders in day
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);

    // percent for orders count
    const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);
    // all earnings
    const totalGain = calculatePrice(allOrders);

    // day earnings
    const gainPerDay = totalGain / daysNumber;

    //yesterday earnings
    const yesterdayGain = calculatePrice(yesterdayOrders);

    // percent earnings
    const gainPercent = ((yesterdayGain / gainPerDay - 1) * 100).toFixed(2);

    // compare earnings
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2);
    // compare orders count
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: +ordersPercent > 0
      }
    });

  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports.analytics = async function (req, res) {
  try {
    const allOrders = await Order.find({ user: req.user.id }).sort({ date: 1 });

    const ordersMap = getOrdersMap(allOrders);

    const average = +(calculatePrice(allOrders) / Object.assign(ordersMap).length).toFixed(2);

    const analytics = Object.keys(ordersMap).map(label => {
      const gain = calculatePrice(ordersMap[label]);
      const order = ordersMap[label].length;

      return {
        label,
        gain,
        order
      };
    });

    res.status(200).json({average, chart});
  } catch (error) {
    errorHandler(res, error);
  }
}


function getOrdersMap(orders = []) {
  const daysOrders = {};

  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY');

    if (date === moment().format('DD.MM.YYYY')) {
      return;
    }

    if (!daysOrders[date]) {
      daysOrders[date] = [];
    }

    daysOrders[date].push(order);
  });

  return daysOrders;
}

function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity;
    }, 0);
    return total += orderPrice;
  }, 0)
}

