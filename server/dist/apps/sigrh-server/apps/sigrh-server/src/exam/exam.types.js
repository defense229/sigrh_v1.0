"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRepartitionStatus = exports.examSteps = exports.ExamStepStatus = exports.ExamStatus = void 0;
var ExamStatus;
(function (ExamStatus) {
    ExamStatus["NEW"] = "NEW";
    ExamStatus["PENDING"] = "PENDING";
    ExamStatus["CLOSED"] = "CLOSED";
})(ExamStatus = exports.ExamStatus || (exports.ExamStatus = {}));
var ExamStepStatus;
(function (ExamStepStatus) {
    ExamStepStatus["ACTIVE"] = "ACTIVE";
    ExamStepStatus["INACTIVE"] = "INACTIVE";
})(ExamStepStatus = exports.ExamStepStatus || (exports.ExamStepStatus = {}));
exports.examSteps = {
    candidateFileCollectStep: 'INACTIVE',
    sportStep: 'INACTIVE',
    fileAuthenticationStep: 'INACTIVE',
    writingStep: 'INACTIVE',
    healthControlStep: 'INACTIVE',
};
var ExamRepartitionStatus;
(function (ExamRepartitionStatus) {
    ExamRepartitionStatus["WAITING"] = "WAITING";
    ExamRepartitionStatus["PROCESSING"] = "PROCESSING";
    ExamRepartitionStatus["FINISHED"] = "FINISHED";
})(ExamRepartitionStatus = exports.ExamRepartitionStatus || (exports.ExamRepartitionStatus = {}));
//# sourceMappingURL=exam.types.js.map