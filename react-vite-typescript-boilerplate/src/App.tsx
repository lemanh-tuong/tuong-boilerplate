import background from '~/images/dsl-bg.png';

export default function App() {
  return (
    <div
      className="min-h-dvh bg-[#0B0B0C] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${background}')` }}
    ></div>
  );
}
