import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";
import { Row, Col, Button } from 'reactstrap';

import { useUser } from '@auth0/nextjs-auth0';
import { isAuthorized } from '@/hoc/withAuth';
import { useDeletePortfolio } from '@/actions/portfolios';

import PortfolioApi from "@/lib/api/portfolios";
import PortfolioCard from "@/components/PortfolioCard";
import { useRouter } from "next/router";
import { useState } from 'react';

const Portfolios = ({portfolios: initialPortfolios}) => {    
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const [portfolios, setPortfolios] = useState(initialPortfolios)
    const [deletePortfolio, {data, error: deleteError}] = useDeletePortfolio();

    const _deletePortfolio = async (e, portfolioId) => {
        e.stopPropagation();
        const isConfirm = confirm('Are you sure you want to delete this portfolio?');
        if(isConfirm){
            await deletePortfolio(portfolioId);
            setPortfolios(portfolios.filter((portfolio) => portfolio._id !== portfolioId));
        }
        
    }
    return (
        <BaseLayout>
            <BasePage header="Portfolios" title="Latest Portfolios - Diego Arias" className="portfolio-page">
                <Row>
                    {portfolios.map(portfolio => 
                        <Col key={portfolio._id} md="4">
                            <PortfolioCard portfolio={portfolio}>
                                { user && isAuthorized(user, 'admin') && 
                                <>
                                    <Button onClick={(e) => {
                                        e.stopPropagation();
                                        router.push('/portfolios/[id]/edit', `/portfolios/${portfolio._id}/edit`)
                                    }} color="warning" className="mr-2">Edit</Button>
                                    <Button 
                                        color="danger" 
                                        onClick={(e) => _deletePortfolio(e, portfolio._id)}
                                    >Delete</Button>
                                </>
                                }
                            </PortfolioCard>
                        </Col>
                    )} 
                </Row>
            </BasePage>          
        </BaseLayout>
    )
}

export async function getStaticProps(){
    const json = await new PortfolioApi().getAll();
    const portfolios = json.data;
    return {
        props: { portfolios },
        revalidate: 1
    }
}

export default Portfolios;