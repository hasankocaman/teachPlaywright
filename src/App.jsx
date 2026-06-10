import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import JMeterPage from './components/JMeterPage'
import SQLPage from './components/SQLPage'
import TypeScriptPage from './components/TypeScriptPage'
import PythonPage from './components/PythonPage'
import TestFrameworksPage from './components/TestFrameworksPage'
import PostmanPage from './components/PostmanPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jmeter" element={<JMeterPage />} />
            <Route path="/sql" element={<SQLPage />} />
            <Route path="/typescript" element={<TypeScriptPage />} />
            <Route path="/python" element={<PythonPage />} />
            <Route path="/test-frameworks" element={<TestFrameworksPage />} />
            <Route path="/postman" element={<PostmanPage />} />
        </Routes>
    )
}

export default App
