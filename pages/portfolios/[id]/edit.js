import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";
import { Row, Col } from 'reactstrap';

import { toast } from 'react-toastify';

import withAuth from '@/hoc/withAuth';
import { useGetPortfolio } from '@/actions/portfolios';
import { useRouter } from 'next/router';

import PortfolioForm from '@/components/PortfolioForm';
import { useUpdatePortfolio } from "@/actions/portfolios";



const PortfolioEdit = ({user}) => {
    const router = useRouter();
    const [ updatePortfolio, {error}] = useUpdatePortfolio();
    const { data: initialData } = useGetPortfolio(router.query.id);
  
    const _updatePortfolio = async (data) => {
        await updatePortfolio(router.query.id, data);
        toast.success('Portfolio has been updated!', {autoClose: 2000})
    }
  
    return (
      <BaseLayout user={user} loading={false}>
        <BasePage header="Portfolio Edit" title="Edit Portfolio - Diego Arias">
          <Row>
            <Col md="8">
              { initialData &&
                <PortfolioForm
                  onSubmit={_updatePortfolio}
                  initialData={initialData}
                />
              }
              {error && 
                <div className="alert alert-danger mt-2">Oops, something went wrong.</div>
              }
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    )
  }


export default withAuth(PortfolioEdit)('admin');