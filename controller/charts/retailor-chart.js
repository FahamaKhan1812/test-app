
const moment = require('moment');
const Product = require("../../models/Product");

//DataSet For retailor Dashboard using retailorID
exports.retailorDataset = async (req, res) => {
    try {
      const RecentProducts = await Product.find({
        retailor: req.params.retailorID,
      }).sort({ updatedAt: -1 }).limit(5);
  
      const dateRange = req.query.dateRange || '1week';
      const startDate = moment().startOf('day').subtract(getDateRangeOffset(dateRange), 'days');
      const endDate = moment().startOf('day');
  
      const datesRange = [];
      const currentDate = startDate.clone();
      while (currentDate.isSameOrBefore(endDate)) {
        datesRange.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'day');}
  
      const productsInRange = await Product.aggregate([
        {
          $match: { retailor: req.params.retailorID,
            updatedAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }}
        },
        { $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
            count: { $sum: 1 } }
        },
        { $project: {
            _id: 0,
            date: "$_id",
            count: 1} }
      ]);
  
      const productsInRangeWithMissingDays = datesRange.map(date => {
        const product = productsInRange.find(p => p.date === date);
        return {
          date,
          count: product ? product.count : 0 };
      });
      const { x_axis, y_axis } = productsInRangeWithMissingDays.reduce(
        (result, { date, count }) => {
          result.x_axis.push(date);
          result.y_axis.push(count);
          return result;
        },
        { x_axis: [], y_axis: [] }
      );
      return res.status(200).json({
        success: true,
        message: [],
        chart_data: { x_axis, y_axis },
        RecentProducts,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Server Error. Please try again.',
        error: err.message,
      });
    }
  };

// TimeFrame Selection:
function getDateRangeOffset(dateRange) {
    switch (dateRange) {
      case '1week':
        return 7;
      case '1month':
        return 30;
      case '3months':
        return 90;
      case '6months':
        return 180;
      case '1year':
        return 365;
      default:
        return 7;
    }
  }