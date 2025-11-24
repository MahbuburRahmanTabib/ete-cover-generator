const { useState } = React;
const { FileText, Download, BookOpen } = lucide;

function ETECoverGenerator() {
  const teachers = [
    { name: "Dr. Md. Kamal Hosain", designation: "Professor", status: "Active" },
    { name: "Dr. Md Munjure Mowla", designation: "Professor", status: "On Leave" },
    { name: "Dr. Mst. Fateha Samad", designation: "Professor", status: "Active" },
    { name: "Dr. Shah Ariful Hoque Chowdhury", designation: "Professor", status: "On Leave" },
    { name: "Dr. Tushar Kanti Roy", designation: "Associate Professor", status: "On Leave" },
    { name: "Md Rabiul Hasan", designation: "Associate Professor", status: "Active" },
    { name: "JANNATUL ROBAIAT MOU", designation: "Assistant Professor", status: "On Leave" },
    { name: "Sham Datto", designation: "Assistant Professor", status: "On Leave" },
    { name: "Md. Aslam Mollah", designation: "Assistant Professor", status: "Active" },
    { name: "A. S. M. Badrudduza", designation: "Assistant Professor", status: "On Leave" },
    { name: "Md. Yeakub Ali", designation: "Assistant Professor", status: "On Leave" },
    { name: "Md. Rakib Hossain", designation: "Assistant Professor", status: "Active" },
    { name: "Shuvra Prokash Biswas", designation: "Assistant Professor", status: "On Leave" },
    { name: "Hasan Sarker", designation: "Assistant Professor", status: "On Leave" },
    { name: "Farzana Akter", designation: "Assistant Professor", status: "Active" },
    { name: "Md Abu Ismail Siddique", designation: "Assistant Professor", status: "Active" },
    { name: "Sharaf Tasnim", designation: "Assistant Professor", status: "Active" },
    { name: "Md. Tarek Hassan", designation: "Lecturer", status: "On Leave" },
    { name: "Mohammed Nazmul Islam Nahin", designation: "Lecturer", status: "Active" },
    { name: "Rubaeat Ahammed", designation: "Lecturer", status: "Active" },
    { name: "Rifa Tabassum Mim", designation: "Lecturer", status: "Active" },
    { name: "Abdulla Al Suman", designation: "Assistant Professor", status: "Retired" }
  ];

  const [formData, setFormData] = useState({
    student_name: '',
    roll: '',
    session: '',
    teacher_name: '',
    teacher_designation: '',
    course_code: '',
    course_name: '',
    report_type: 'Lab Report',
    experiment_no: '',
    experiment_name: '',
    experiment_date: '',
    submission_date: ''
  });
  
  const [savedStudents, setSavedStudents] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'teacher_name') {
      const selectedTeacher = teachers.find(t => t.name === value);
      setFormData({
        ...formData,
        teacher_name: value,
        teacher_designation: selectedTeacher ? selectedTeacher.designation : ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingStudent = savedStudents.find(s => s.roll === formData.roll);
    if (!existingStudent && formData.roll && formData.student_name) {
      setSavedStudents([...savedStudents, {
        student_name: formData.student_name,
        roll: formData.roll,
        session: formData.session
      }]);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const getItemLabel = () => {
    return formData.report_type === 'Assignment' ? 'Assignment' : 'Experiment';
  };

  const loadStudentData = (student) => {
    setFormData({
      ...formData,
      student_name: student.student_name,
      roll: student.roll,
      session: student.session
    });
  };

  const generatePreview = () => {
    const itemLabel = getItemLabel();
    return (
      <div className="w-full bg-white" style={{ 
        fontFamily: 'Times New Roman, serif',
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm 19mm',
        boxSizing: 'border-box',
        margin: '0 auto'
      }}>
        <div className="text-center mb-4">
          <p className="italic text-sm">Heaven's Light is Our Guide</p>
        </div>
        
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Rajshahi University of Engineering & Technology</h1>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold">Department of Electronics & Telecommunication Engineering</h2>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="w-24 h-28 bg-gray-200 flex items-center justify-center border-2 border-gray-400">
            <i data-lucide="file-text" style={{width: '48px', height: '48px'}} className="text-gray-500"></i>
            <div className="absolute text-xs text-gray-600">RUET Logo</div>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{formData.course_code}: {formData.course_name}</h2>
        </div>
        
        <div className="border-t-2 border-black mb-4"></div>
        
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{formData.report_type} No. {formData.experiment_no}</h2>
        </div>
        
        <div className="text-center mb-2">
          <h3 className="text-xl font-bold">{itemLabel} Name: {formData.experiment_name}</h3>
        </div>
        
        <div className="border-t-2 border-black mb-6"></div>
        
        <div className="flex justify-between mb-6 px-12">
          <div>
            <p className="text-lg font-bold italic mb-2">Submitted by:</p>
            <p>{formData.student_name}</p>
            <p>Roll: {formData.roll}</p>
            <p>Session: {formData.session}</p>
          </div>
          <div>
            <p className="text-lg font-bold italic mb-2">Submitted to:</p>
            <p>{formData.teacher_name}</p>
            <p>{formData.teacher_designation}</p>
            <p>Dept. of ETE, RUET</p>
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-lg font-bold">Date of Experiment: {formatDate(formData.experiment_date)}</p>
          <p className="text-lg font-bold">Date of Submission: {formatDate(formData.submission_date)}</p>
        </div>
        
        <div className="border-t border-black mb-4"></div>
        
        <div className="text-center mb-4">
          <p className="text-lg font-bold">(Teacher's Section)</p>
        </div>
        
        <div className="flex justify-around px-12 mb-6">
          <div>
            <p className="font-bold underline mb-2">Report</p>
            <div className="space-y-1">
              <p>☐ Excellent</p>
              <p>☐ Very Good</p>
              <p>☐ Good</p>
              <p>☐ Average</p>
              <p>☐ Poor</p>
            </div>
          </div>
          <div>
            <p className="font-bold underline mb-2">Viva</p>
            <div className="space-y-1">
              <p>☐ Excellent</p>
              <p>☐ Very Good</p>
              <p>☐ Good</p>
              <p>☐ Average</p>
              <p>☐ Poor</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="mb-2">——————</p>
          <p>Signature</p>
        </div>
      </div>
    );
  };

  const downloadPDF = () => {
    window.print();
  };

  return React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6" },
    React.createElement('div', { className: "max-w-7xl mx-auto" },
      React.createElement('div', { className: "text-center mb-8" },
        React.createElement('h1', { className: "text-4xl font-bold text-indigo-900 mb-2 flex items-center justify-center gap-3" },
          React.createElement('i', { 'data-lucide': 'book-open', style: {width: '40px', height: '40px'} }),
          'ETE Lab & Assignment Cover Generator'
        ),
        React.createElement('p', { className: "text-gray-600" }, 
          'RUET - Department of Electronics & Telecommunication Engineering'
        )
      ),
      
      React.createElement('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
        React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-6" },
          React.createElement('h2', { className: "text-2xl font-bold text-gray-800 mb-4" }, 'Cover Page Information'),
          
          savedStudents.length > 0 && React.createElement('div', { className: "mb-4 p-3 bg-blue-50 rounded" },
            React.createElement('p', { className: "font-semibold mb-2 text-sm" }, 'Quick Load Student:'),
            React.createElement('div', { className: "flex flex-wrap gap-2" },
              savedStudents.map((student, idx) =>
                React.createElement('button', {
                  key: idx,
                  onClick: () => loadStudentData(student),
                  className: "px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                }, `${student.student_name} (${student.roll})`)
              )
            )
          ),
          
          React.createElement('div', { className: "space-y-4" },
            React.createElement('div', null,
              React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Student Name *'),
              React.createElement('input', {
                type: "text",
                name: "student_name",
                value: formData.student_name,
                onChange: handleChange,
                required: true,
                className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              })
            ),
            
            React.createElement('div', { className: "grid grid-cols-2 gap-4" },
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Roll *'),
                React.createElement('input', {
                  type: "text",
                  name: "roll",
                  value: formData.roll,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Session *'),
                React.createElement('input', {
                  type: "text",
                  name: "session",
                  value: formData.session,
                  onChange: handleChange,
                  placeholder: "e.g., 2021-22",
                  required: true,
                  className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                })
              )
            ),
            
            React.createElement('div', null,
              React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Teacher Name *'),
              React.createElement('select', {
                name: "teacher_name",
                value: formData.teacher_name,
                onChange: handleChange,
                required: true,
                className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              },
                React.createElement('option', { value: "" }, '-- Select Teacher --'),
                teachers
                  .filter(teacher => teacher.status === "Active")
                  .map((teacher, idx) =>
                    React.createElement('option', { key: idx, value: teacher.name },
                      `${teacher.name} (${teacher.designation})`
                    )
                  )
              )
            ),
            
            React.createElement('div', null,
              React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Teacher Designation *'),
              React.createElement('input', {
                type: "text",
                name: "teacher_designation",
                value: formData.teacher_designation,
                onChange: handleChange,
                required: true,
                readOnly: true,
                className: "w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              })
            ),
            
            React.createElement('div', { className: "grid grid-cols-2 gap-4" },
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Course Code *'),
                React.createElement('input', {
                  type: "text",
                  name: "course_code",
                  value: formData.course_code,
                  onChange: handleChange,
                  placeholder: "e.g., ETE 3101",
                  required: true,
                  className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Report Type *'),
                React.createElement('select', {
                  name: "report_type",
                  value: formData.report_type,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                },
                  React.createElement('option', { value: "Lab Report" }, 'Lab Report'),
                  React.createElement('option', { value: "Assignment" }, 'Assignment')
                )
              )
            ),
            
            React.createElement('div', null,
              React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Course Name *'),
              React.createElement('input', {
                type: "text",
                name: "course_name",
                value: formData.course_name,
                onChange: handleChange,
                placeholder: "e.g., Digital Electronics Lab",
                required: true,
                className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              })
            ),
            
            React.createElement('div', { className: "grid grid-cols-2 gap-4" },
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" },
                  `${getItemLabel()} No *`
                ),
                React.createElement('input', {
                  type: "text",
                  name: "experiment_no",
                  value: formData.experiment_no,
                  onChange: handleChange,
                  placeholder: "e.g., 01",
                  required: true,
                  className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                })
              ),
              React.createElement('div', null,
                React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" },
                  `${getItemLabel()} Date *`
                ),
                React.createElement('input', {
                  type: "date",
                  name: "experiment_date",
                  value: formData.experiment_date,
                  onChange: handleChange,
                  required: true,
                  className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                })
              )
            ),
            
            React.createElement('div', null,
              React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" },
                `${getItemLabel()} Name *`
              ),
              React.createElement('input', {
                type: "text",
                name: "experiment_name",
                value: formData.experiment_name,
                onChange: handleChange,
                required: true,
                className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              })
            ),
            
            React.createElement('div', null,
              React.createElement('label', { className: "block text-sm font-semibold text-gray-700 mb-1" }, 'Submission Date *'),
              React.createElement('input', {
                type: "date",
                name: "submission_date",
                value: formData.submission_date,
                onChange: handleChange,
                required: true,
                className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              })
            ),
            
            React.createElement('button', {
              onClick: handleSubmit,
              className: "w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            },
              React.createElement('i', { 'data-lucide': 'file-text', style: {width: '20px', height: '20px'} }),
              'Save Student Info'
            )
          )
        ),
        
        React.createElement('div', { className: "bg-white rounded-lg shadow-lg p-6" },
          React.createElement('div', { className: "flex justify-between items-center mb-4" },
            React.createElement('h2', { className: "text-2xl font-bold text-gray-800" }, 'Live Preview'),
            React.createElement('button', {
              onClick: downloadPDF,
              className: "bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
            },
              React.createElement('i', { 'data-lucide': 'download', style: {width: '18px', height: '18px'} }),
              'Download PDF'
            )
          ),
          
          React.createElement('div', { 
            className: "border-2 border-gray-200 rounded-lg overflow-auto bg-gray-50",
            style: { maxHeight: '800px' }
          },
            React.createElement('div', { id: "pdf-preview" }, generatePreview())
          )
        )
      ),
      
      React.createElement('div', { className: "mt-6 text-center text-sm text-gray-600" },
        React.createElement('p', null, 'Note: Use Ctrl+P or Cmd+P to print/save as PDF')
      )
    ),
    
    React.createElement('style', null, `
      @media print {
        body * {
          visibility: hidden;
        }
        #pdf-preview, #pdf-preview * {
          visibility: visible;
        }
        #pdf-preview {
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      @page {
        size: A4;
        margin: 0;
      }
    `)
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ETECoverGenerator));

// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
