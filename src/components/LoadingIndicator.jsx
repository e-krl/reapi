function LoadingIndicator({isPage=true}) {
    return (
      <div className={`${isPage ? 
      'fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center' : 
      'flex items-center justify-center h-full'}`}>
        <div
          class="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
        </div>
      </div>
    );
  }
  
  export default LoadingIndicator;
  