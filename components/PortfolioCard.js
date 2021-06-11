import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
import { useRouter } from "next/router";

const PortfolioCard = ({portfolio, children}) => {
    const router = useRouter();
    return(
       
        <Card 
            className="portfolio-card" 
            onClick={() => {
                router.push('/portfolios/[id]', `/portfolios/${portfolio._id}`)
            }}
        >
        <CardHeader className="portfolio-card-header">{portfolio.jobTitle}</CardHeader>
        <CardBody>
            <p className="portfolio-card-city">{portfolio.location}</p>
            <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
            <CardText className="portfolio-card-text">{portfolio.description}</CardText>
            {children}
        </CardBody>
        </Card>


    )
}

export default PortfolioCard;