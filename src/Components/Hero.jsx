
const Hero = () => {
    return (
        <div className={"flex gap-10 flex-col bg-background-pattern bg-cover bg-center w-[100vw] h-[80vh] text-center text-white p-10"}>

            <h1 className="text-gradient-blue md:text-5 text-3.5 h-36 text-balance">Stay on Top of Your <br /> <br /> Caffeine Game!</h1>
            <h2 className="md:text-3xl text-2xl">Monitor your caffeine intake, set daily limits <br /> and discover insights into your coffee habits.</h2>
            <a href="#coffeForm">
<button
  className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
>
  <div className="relative overflow-hidden">
    <p
      className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
    >
      Get started 
    </p>
    <p
      className="absolute text-center top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]"
    >
      For free
    </p>
  </div>
</button>
</a>



        </div>
    )
}

export default Hero