import React from 'react';
import ReactSelect from 'react-select';
import apiClient from 'panoptes-client/lib/api-client';
import reactSelectCss from 'react-select/dist/react-select.css' // eslint-disable-line

const ProjectSearch = ({ value, onChange }) => {
  const getOptions = (input) => {
    const query = {
      search: `%${input}%`,
      launch_approved: !apiClient.params.admin ? true : undefined,
    };

    return apiClient.type('projects').get(query, {
      page_size: 10,
    }).then((projects) => {
      const opts = projects.map(project => ({
        value: project.id,
        label: project.display_name,
      }));
      return { options: opts };
    });
  };

  return (
    <ReactSelect.Async
      autoload={false}
      className="project-search"
      multi={false}
      isLoading={true}
      loadOptions={getOptions}
      name="projectSearch"
      onChange={onChange}
      value={value}
    />
  );
};

ProjectSearch.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default ProjectSearch;
