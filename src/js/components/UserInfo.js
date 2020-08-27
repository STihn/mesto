import { nameInput, jobInput } from '../constants.js';

export class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        nameInput.value = this._name.textContent;
        jobInput.value = this._job.textContent;
    }
    
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
    }
}