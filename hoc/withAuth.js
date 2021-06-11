
import { useUser } from '@auth0/nextjs-auth0';
import Redirect from '@/components/shared/Redirect';

const withAuth = Component => role => {

    return props => {
        const { user, error, isLoading } = useUser();

        if(isLoading){
            return <p>Loading</p>
        }
        if(!user){
            return <Redirect to="/api/auth/login" />
        } else{
            if(user && role && !user['http://diego-portfolio.com/roles'].includes(role)){
                return <Redirect to="/api/auth/login" />
            }
            return <Component user={user} loading={isLoading} {...props} />
        }
        
    }
}

export const isAuthorized = (user, role) => {
    return (user && user['http://diego-portfolio.com/roles'].includes(role))
}

export default withAuth;