import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

function ProjectDetails() {
  const { projectId } = useParams();
  const project = useSelector(state => state.projects.projects.find(project => project._id === projectId));

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <>
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-6 pt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h2 className='h2'>{project.name}</h2>
                <p className='p'>{project.description}</p>
            </div>    
        </section>

      </main>
    
    <Footer />
    


    </div>
    </>
  );
}

export default ProjectDetails;
