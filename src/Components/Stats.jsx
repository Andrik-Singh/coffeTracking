import { useAuth } from "../context/AuthContext"
import { calculateCoffeeStats, calculateCurrentCaffeineLevel, getTopThreeCoffees, statusLevels } from "../utils"
const StatGrid = ({ title, children }) => {
  return (
    <div className="w-full  border-black border-2 bg-slate-200 rounded-xl p-10 flex flex-col gap-3">
      <h1 className="text-start">{title}</h1>
      <div>
        {children}
      </div>
    </div>
  )
}
const Stats = () => {
  const { globalData } = useAuth()
  const stats = calculateCoffeeStats(globalData || {})
  const caffeineLevel = calculateCurrentCaffeineLevel(globalData || {})
  const statusLevel = caffeineLevel < statusLevels['low'].maxLevel ? 'low' :
    caffeineLevel < statusLevels['moderate'].maxLevel ? 'moderate' :
      'high'
  return (
    <section className="flex flex-col gap-10 p-10">
      <h1 className="text-4xl ">
        <i className="fa-solid fa-chart-simple mr-3"></i>
        Stats
      </h1>
      <StatGrid title={"Active caffeine level"}>
        <div className="flex gap-3 md:flex-row flex-col">
          <h1><span className="text-4xl">{caffeineLevel}</span>mg</h1>
          <div style={{
            background: statusLevels[statusLevel].background,
            color: statusLevels[statusLevel].color
          }} className="w-28 h-10 grid place-items-center rounded-sm shadow-sm shadow-black">
            {statusLevel.charAt(0).toLocaleUpperCase() + statusLevel.slice(1)}
          </div>
          <div>
            {statusLevels[statusLevel].description}
          </div>
        </div>
      </StatGrid>
      <StatGrid title={"Average coffes"}>
        <div className="text-4xl">
          {stats?.average_coffees}
        </div>
      </StatGrid>
      <StatGrid title={"Average Daily Expenditure"}>
        <div className="text-4xl">
          {stats?.daily_cost}
        </div>
      </StatGrid>
      <StatGrid title={"Average Coffees daily"}>
        <div className="text-4xl">
          {stats?.average_coffees}
        </div>
      </StatGrid>
      <StatGrid title={"Total cost"}>
        <div className="text-4xl">
          {stats?.total_cost}
        </div>
      </StatGrid>
      <table className="" >
        <thead>
          <tr>
            <th>Coffe name</th>
            <th>Number of coffes</th>
            <th>Total percentage</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {getTopThreeCoffees(globalData || {}).map((coffe, index) => {
            return (
              <tr key={index}>
                <td>{coffe.coffeeName}</td>
                <td>{coffe.count}</td>
                <td>{coffe.percentage}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}


export default Stats