import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/BasePage";
import Masthead from "@/components/shared/Masthead";
import { Row, Col, Button } from 'reactstrap';
import Link from 'next/link';
import PortButtonDropdown from "@/components/shared/Dropdown";
import { toast } from 'react-toastify';

import { useState } from 'react';
import withAuth from '@/hoc/withAuth';
import { useUpdateBlog, useGetUserBlogs } from '@/actions/blogs';

import { getAccessToken } from '@auth0/nextjs-auth0';
import BlogApi from '@/lib/api/blogs';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Dashboard = ({user, loading}) => {
    const [updateBlog] = useUpdateBlog();
    const {data: blogs, mutate} = useGetUserBlogs();

    const changeBlogStatus = async (blogId, status, error) => {
        try {
            await updateBlog(blogId, {status});
            mutate();
            toast.success('Blog Updated!');
        } catch (error) {
            toast.error('Oops... Something went wrong');
        }
        
    }

    const createOptions = (blog) => {
        const optionsArray = [];
        if(blog.status === 'published'){
            optionsArray.push({key: `${blog._id}-draft`, text: 'Draft', handlers: { onClick: () => { changeBlogStatus(blog._id, "draft")}}});
        } else {
            optionsArray.push({key: `${blog._id}-publish`, text: 'Publish', handlers: { onClick: () => { changeBlogStatus(blog._id, "published")}}});
        }
        optionsArray.push({key: `${blog._id}-delete`, text: 'Archive', handlers: { onClick: () => { changeBlogStatus(blog._id, "archived")}}});
        return optionsArray;
    }

    const renderBlogs = (blogs, status) => (
        <ul className="user-blogs-list">
            {
                blogs.filter((blog) => blog.status === status).map(blog => 
                    <li key={blog._id}>
                        <Link href='/blogs/editor/[id]' as={`/blogs/editor/${blog._id}`}>
                            <a>{blog.title}</a>
                        </Link>
                        <PortButtonDropdown items={createOptions(blog)} />
                    </li>
                )
            }
        </ul>
    )

    return(
        <BaseLayout navClass="transparent" user={user} loading={loading}>
            <Masthead imagePath="/images/home-bg.jpg">
                <h1>Blogs Dashboard</h1>
                <span className="subheading">
                    Let's write some nice blog today{' '}
                    <Link href='/blogs/editor'>
                        <Button color="primary">Create a new Blog</Button>
                    </Link>
                </span>
            </Masthead>
            <BasePage className="blog-user-page" title="Dashboard - Diego Arias">
                <Row>
                <Col md="6" className="mx-auto text-center">
                    <h2 className="blog-status-title"> Published Blogs </h2>
                    {blogs && renderBlogs(blogs, 'published')}
                </Col>
                <Col md="6" className="mx-auto text-center">
                    <h2 className="blog-status-title"> Draft Blogs </h2>
                    {blogs && renderBlogs(blogs, 'draft')}
                </Col>
                </Row>
            </BasePage>
        </BaseLayout>
    )
}

/* // Getting blogs server-side with accessToken to getByUser
export const getServerSideProps = (async ({req, res}) => {
    const { accessToken } = await getAccessToken(req, res);
    const json = await new BlogApi(accessToken).getByUser();
    return { props: {blogs: json.data} }
}); */

export default withAuth(Dashboard)('admin');