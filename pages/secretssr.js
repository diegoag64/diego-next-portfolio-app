import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const SecretSSR = () => {
    const {user, isLoading } = useUser();

    console.log(user);


    return(
        <BaseLayout user={user} loading={isLoading}>
            <BasePage>
                <h1>Secret Page - Hello {user && user.name}</h1>
            </BasePage>
        </BaseLayout>
    )
}

export const getServerSideProps = withPageAuthRequired();


export default SecretSSR;