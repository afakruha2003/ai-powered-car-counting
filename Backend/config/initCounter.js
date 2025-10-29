import Counter from "../models/counter.model.js";

const initCounter = async () => {
   const exists = await Counter.findOne({ name: "carCounter" });
   if (!exists) {
      await Counter.create({ name: "carCounter", value: 0 });
   }
};

export default initCounter;
