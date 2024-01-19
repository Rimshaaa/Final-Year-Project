import Chart from "../../components/charts/Chart";
import Featuredinfo from "../../components/featuredinfo/Featuredinfo";
import "./home.css";
import { userData } from "../../dummydata";
import Widgetsmall from "../../components/widgetsmall/Widgetsmall";
import Widgetlarge from "../../components/widgetlarge/Widgetlarge";
import { useGetAnalyticsQuery } from "../../redux/api";
import moment from "moment";

export default function Home() {
  const { data } = useGetAnalyticsQuery();
  return (
    <div className="home">
      <Featuredinfo />
      <Chart
        data={data || []}
        title={`User Analytics ${moment().format("YYYY")}`}
        grid
        dataKey="Accounts"
      />
      <div className="homeWidgets">
        {/* <Widgetsmall /> */}
        <Widgetlarge />
      </div>
    </div>
  );
}
