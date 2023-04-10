import axios from 'axios';

const API_URL = '/api/user/projects';

const projectService = {
  createProject: async (projectData) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { token } = user;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const { name, description } = projectData;
    const createdBy = user._id;

    const response = await axios.post(API_URL + '/new-project', {name, description, createdBy }, {
      headers,
    });

    if(response.data) {
      localStorage.setItem('newproject', JSON.stringify
      (response.data));
      const newProjectId = response.data._id;
      console.log(response)
  }

    return response.data;
  },

  getAllProjects: async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { token } = user;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(API_URL, {
      headers,
    });

    return response.data;
  },

  updateProject: async (projectId, projectData) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { token } = user;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.patch(`${API_URL}/${projectId}`, projectData, {
      headers,
    });

    return response.data;
  },

  deleteProject: async (projectId) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { token } = user;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(`${API_URL}/delete-project`, {
      headers,
      data: {
        _id: projectId,
      },
    });

    return response.data;
  },
};

export default projectService;
