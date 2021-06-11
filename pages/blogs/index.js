import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";
import { Container, Row, Col } from 'reactstrap';
import Masthead from '@/components/shared/Masthead';
import Link from 'next/link';
import BlogApi from '@/lib/api/blogs';
import BlogItem from '@/components/BlogItem';

const Blogs = ({blogs}) => {
    return(
        <BaseLayout
            navClass="transparent" className="blog-listing-page"
            user={null} loading={false}>

            <Masthead imagePath="/images/home-bg.jpg">
                <h1>Fresh Blogs</h1>
                <span className="subheading">Programming, travelling...</span>
            </Masthead>
            
            <BasePage
                className="blog-body"
                title="Latest Blogs - Diego Arias"
            >
                <Row>
                    <Col md="10" lg="8" className="mx-auto">
                    {blogs.map(blog => 
                        <BlogItem key={blog._id} blog={blog} />
                    )}
                    </Col>
                
                    
                
                </Row>
            </BasePage>
        </BaseLayout>
    )
}

export async function getStaticProps(){
    const { data } = await new BlogApi().getAll();
    const blogs = data.map(item => ({...item.blog, author: item.author}))
    return {
        props: {blogs},
        revalidate: 5
    }
}

export default Blogs;