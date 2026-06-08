import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import JMeterPage from './components/JMeterPage'
import SQLPage from './components/SQLPage'
import TypeScriptPage from './components/TypeScriptPage'
import PythonPage from './components/PythonPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jmeter" element={<JMeterPage />} />
            <Route path="/sql" element={<SQLPage />} />
            <Route path="/typescript" element={<TypeScriptPage />} />
            <Route path="/python" element={<PythonPage />} />
        </Routes>
    )
}

export default App
