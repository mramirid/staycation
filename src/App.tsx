import Button from "./components/Button";

export default function App() {
  return (
    <>
      <h1 className="text-purple-500">Hello World</h1>
      <Button isLink isExternal href="https://github.com/mramirid" isPrimary>
        Follow Me on GitHub
      </Button>
    </>
  );
}
