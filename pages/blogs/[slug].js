import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";
import { Row, Col } from 'reactstrap';
import BlogApi from '@/lib/api/blogs';
import { SlateView } from 'slate-simple-editor';
import moment from 'moment';
import Avatar from "@/components/shared/Avatar";


const BlogDetail = ({blog, author}) => {
    console.log(blog);
    return(
        <BaseLayout>
            <BasePage className="slate-container" title={`${blog.title} - Diego Arias`}>
            <Row>
                <Col md={{size: 8, offset: 2}}>
                    <Avatar
                        title={author.name}
                        image={author.picture}
                        date={blog.createdAt}
                    />
                    <hr/>
                    <h1>{blog.title}</h1>
                    <h2>{blog.subTitle}</h2>
                    
                    <SlateView initialContent={blog.content} />
                    
                </Col>
            </Row>
                
            </BasePage>
        </BaseLayout>
    )
}

export async function getStaticPaths() {
    const { data } = await new BlogApi().getAll();
    //const blogs = json.data;
    const paths = data.map(({blog}) => ({params: { slug: blog.slug}}));
    return { paths, fallback: false};
}

export async function getStaticProps({params}) {
    const { data: {blog, author} } = await new BlogApi().getBySlug(params.slug);
    return {props: {blog, author}}
  }

export default BlogDetail;