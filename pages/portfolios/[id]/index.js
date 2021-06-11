import {useRouter} from "next/router";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";
import PortfolioApi from '@/lib/api/portfolios';
import { formatDate } from '@/helpers/functions';

const Portfolio = ({portfolio}) => {
  const router = useRouter();
  
  return (
      <BaseLayout>
          <BasePage title={`${portfolio.title} - Diego Arias`} className="no-wrapper">
          <div className="portfolio-detail">
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner page-cover">
              <h1 className="cover-heading">{portfolio.title}</h1>
              <p className="lead dates">{formatDate(portfolio.startDate)} - {formatDate(portfolio.endDate) || 'Present'}</p>
              <p className="lead info mb-0">{portfolio.jobTitle} | {portfolio.company} | {portfolio.location}</p>
              <p className="lead">{portfolio.description}</p>
              <p className="lead">
                <a href={`//${portfolio.companyWebsite}`} className="btn btn-lg btn-secondary">Visit Company</a>
              </p>
            </main>
            </div>
          </div>
              
          </BasePage>
      </BaseLayout>
      
  )
}



/* export async function getServerSideProps({query}){
  const json = await new PortfolioApi().getById(query.id);
  const portfolio = json.data;

  return {props: {portfolio}};
} */

// This function is executed at the build time
export async function getStaticPaths(){
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  // Get the paths we pre-render based on portfolio ID
  const paths = portfolios.map(portfolio => {
    return {
      params: { id: portfolio._id }
    }
  })
  return { paths, fallback: false };
}

export async function getStaticProps({params}){
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { 
    props: {portfolio},
    revalidate: 1
  }
}

export default Portfolio;