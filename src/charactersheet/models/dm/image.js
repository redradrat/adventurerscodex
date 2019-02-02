import 'bin/knockout-mapping-autoignore';
import 'knockout-mapping';
import { KOModel } from 'hypnos/lib/models/ko';
import { Utility } from 'charactersheet/utilities';
import ko from 'knockout';


export class Image extends KOModel {
    static __skeys__ = ['core', 'images'];
    static __dependents__ = ['Environment', 'EncounterImage'];

    static mapping = {
        include: ['coreUuid', 'description']
    };

    coreUuid = ko.observable(null);
    name = ko.observable();
    description = ko.observable();
    sourceUrl = ko.observable();
    isExhibited = ko.observable();

    toJSON = function() {
        var name = this.name() ? this.name() : 'Untitled';
        return { name: name, url: this.sourceUrl() };
    };

    shortDescription = ko.pureComputed(() => {
        try {
            return Utility.string.truncateStringAtLength(this.description(), 100);
        } catch(e) {
            // Ignore
        }
    });
}

Image.validationConstraints = {
    rules: {
        name: {
            required: true,
            maxlength: 256
        },
        sourceUrl: {
            required: true,
            url: true,
            maxlength: 512
        }
    }
};
