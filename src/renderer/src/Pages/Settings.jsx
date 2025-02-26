import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import CustomError from "../Entities/CustomError.jsx";
import { Input } from "@material-tailwind/react";

const Settings = () => {
    const { settings, setErrors, setResetSettings } = useContext(GlobalContext);
    const [selectedKeyValue, setSelectedKeyValue] = useState(null);

    const handleUpdateSetting = async () => {
        try {
            const updateResult = await window.api.setSettings(selectedKeyValue);
            if (updateResult.success) {
                console.log(`Setting: ${selectedKeyValue.key} updated successfully`);
                setResetSettings(prev => !prev);
            }
        } catch (err) {
            const error = CustomError.fromError(err);
            setErrors(prev => [...prev, error]);
        }
    };

    return (
        <div className="p-6 w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="w-6/12">
                {settings.map((setting) => (
                    <div key={setting.key} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            {setting.key}
                        </label>
                        <Input
                            type="text"
                            value={setting.key === selectedKeyValue?.key ? selectedKeyValue.value : setting.value}
                            onChange={(e) => 
                                setSelectedKeyValue({ key: setting.key, value: e.target.value })
                            }
                            onBlur={handleUpdateSetting}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleUpdateSetting();
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Settings;
