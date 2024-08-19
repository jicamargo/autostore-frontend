const LoadingLocal = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-5">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-800"></div>
      Cargando...
    </div>
  );
}

export default LoadingLocal;