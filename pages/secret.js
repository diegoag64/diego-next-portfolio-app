import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";

import withAuth from '@/hoc/withAuth';

const Secret = ({user, loading}) => {
    return(
        <BaseLayout>
            <BasePage>
                <h1>Secret Page - {user.name}</h1>
            </BasePage>
        </BaseLayout>
    )
}


export default withAuth(Secret)();