import {CertificateFetcher, Validator} from "./v2";
import {Face} from "../face";
import {BoostInfoTree} from "../util/boost-info-parser";

export class ValidatorConfig extends Validator {
    /**
     * ValidatorConfig extends Validator to implements a validator which can be
     * set up via a configuration file.
     *
     * The constructor has two forms:
     * ValidatorConfig(fetcher) - Create a ValidatorConfig that uses the given
     * certificate fetcher.
     * ValidatorConfig(face) - Create a ValidatorConfig that uses a
     * CertificateFetcherFromNetwork for the given Face.
     * @param {CertificateFetcher} fetcher the certificate fetcher to use.
     * @param {Face} face The face for the certificate fetcher to call
     * expressInterest.
     * @constructor
     */
    constructor(fetcherOrFace: CertificateFetcher | Face);

    /**
     * There are three forms of load:
     * load(filePath) - Load the configuration from the given config file.
     * load(input, inputName) - Load the configuration from the given input string.
     * load(configSection, inputName) - Load the configuration from the given
     * configSection.
     * Each of these forms of load replaces any existing configuration.
     * @param {String} filePath The The path of the config file.
     * @param {String} input The contents of the configuration rules, with lines
     * separated by "\n" or "\r\n".
     * @param {BoostInfoTree} The configuration section loaded from the config file.
     * It should have one "validator" section.
     * @param {String} inputName Used for log messages, etc.
     */
    load(filePathOrInputOrConfigSection: string | BoostInfoTree, inputName: string)
}