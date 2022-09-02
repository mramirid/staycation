import { type Range } from "react-date-range";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Route, Routes } from "react-router-dom";
import {
  Breadcrumbs,
  DetailPropertyPage,
  InputDateRange,
  InputNumber,
} from "./features/detail-property";
import { LandingPage } from "./features/landing-page";

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/properties/:id" element={<DetailPropertyPage />} />
      <Route path="/tests/inputs" element={<TestInputs />} />
      <Route path="/tests/breadcrumbs" element={<TestBreadcrumbs />} />
    </Routes>
  );
}

function TestInputs() {
  type IFormInputs = {
    night: number;
    "date-range": Range;
  };

  const { handleSubmit, control } = useForm<IFormInputs>();

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
            // className="w-[12rem] h-[12rem]"
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
            // className="w-[12rem] h-[12rem]"
            value={field.value}
            minDate={new Date()}
            onChange={field.onChange}
          />
        )}
      />
    </form>
  );
}

function TestBreadcrumbs() {
  return (
    <Breadcrumbs
      data={[
        { label: "Home", to: "/" },
        { label: "House Details", to: "/tests/breadcrumbs" },
      ]}
    />
  );
}
