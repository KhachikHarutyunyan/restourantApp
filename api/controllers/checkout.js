const Checkout = require('../models/checkout');
const errorHandler = require('../utils/errHandler');

module.exports.getAllCheckoutes = async function(req, res) { 
    
    const query = {};

    if (req.query.start) {
        query.date = {
            $gte: req.query.start
        };
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {};
        }
        query.date['$lte'] = req.query.end;
    }

    if (req.query.order) {
        query.order = +req.query.order;
    }

    try {
        const checkoutes = await Checkout.find(query)
                .sort({date: -1})
                .skip(+req.query.offset)
                .limit(+req.query.limit);
                
        res.status(200).json(checkoutes);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.getAllUserCheckoutes = async function(req, res) {
    try {
        const userCheckoutes = await Checkout.findById({ userId: req.params.id });
        res.status(200).json(userCheckoutes);
    } catch (error) {
        errorHandler(res, error);
    }
}


module.exports.createCheckout = async function (req, res) {

    try {
        const lastCheckout = await Checkout.findOne({}).sort({ date: -1 });

        const maxOrder = lastCheckout? lastCheckout.order: 0;

        const newCheckout = await new Checkout({
            name: req.body.name,
            surname: req.body.surname,
            telephon: req.body.telephon,
            street: req.body.street,
            payment: req.body.payment,
            order: maxOrder + 1,
            orders: req.body.orders
        }).save();
        res.status(201).json(newCheckout);
    } catch (error) {
        errorHandler(res, error);
    }

}


