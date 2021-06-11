import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";

import withAuth from '@/hoc/withAuth';

const OnlyAdmin = ({user, loading}) => {
    return(
        <BaseLayout>
            <BasePage>
                <h1>Only Admin - Hello {user.name}</h1>
            </BasePage>
        </BaseLayout>
    )
}


export default withAuth(OnlyAdmin)('admin');