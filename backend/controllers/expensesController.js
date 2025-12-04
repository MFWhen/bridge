import expenses from "../routes/expensesRoute";

export const getExpenses = async(req , res) => {
    try{
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
            })
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const createExpense = async(req , res) => {
    try{
        req.body.user = req.user.id

        const expense = await Expense.create(req.body)

        res.status(201).json({
            success: true,
            data: expense
        })

    } catch(error){
         if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
            success: false,
            message: messages.join(', ')
      });
    }
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const updateExpense = async(req , res) => {
    try{

    } catch(error){

    }
}

export const deleteExpense = async(req , res) => {
    try{

    } catch(error){

    }
}