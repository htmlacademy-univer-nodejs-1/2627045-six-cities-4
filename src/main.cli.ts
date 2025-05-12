#!/usr/bin/env node

import CliApplication from './app/cli.js';
import 'reflect-metadata';
import { GenerateCommand, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

const myManager = new CliApplication();
myManager.registerCommands([new HelpCommand(), new VersionCommand(), new ImportCommand(), new GenerateCommand()]);
myManager.processCommand(process.argv);
