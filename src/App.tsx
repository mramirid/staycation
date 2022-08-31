import { DateRange, type Range } from "react-date-range";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Route, Routes } from "react-router-dom";
import InputDateRange from "./features/detail-property/components/InputDateRange";
import InputNumber from "./features/detail-property/components/InputNumber";
import { LandingPage } from "./features/landing-page";

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/tests/inputs" element={<TestInputs />} />
      <Route path="/tests/date-range" element={<TestDateRange />} />
    </Routes>
  );
}

function TestInputs() {
  type IFormInputs = {
    night: number;
    "date-range": Range;
  };

  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      night: 1,
      "date-range": {
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(0, 1)),
        key: "selection",
      },
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[20rem] h-[30rem] border-red-800 border"
    >
      <Controller
        control={control}
        name="night"
        rules={{ required: true }}
        render={({ field }) => (
          <InputNumber
            className="w-[12rem] h-[12rem]"
            name={field.name}
            value={field.value}
            suffix={{ value: "night", pluralValue: "nights" }}
            min={1}
            max={3}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="date-range"
        rules={{ required: true }}
        render={({ field }) => (
          <InputDateRange
            className="w-[12rem] h-[12rem]"
            name={field.name}
            value={field.value}
            placeholder="HOHOIHE"
            onChange={field.onChange}
          />
        )}
      />
    </form>
  );
}

function TestDateRange() {
  return (
    <DateRange
      editableDateInputs={true}
      moveRangeOnFirstSelection={false}
      ranges={[
        {
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(0, 1)),
          key: "selection",
        },
      ]}
    />
  );
}
